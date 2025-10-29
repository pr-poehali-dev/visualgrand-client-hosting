import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Регистрация и управление пользователями
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    
    try:
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            username = body_data.get('username', '').strip()
            email = body_data.get('email', '').strip()
            
            if not username or not email:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Username and email required'})
                }
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "INSERT INTO users (username, email) VALUES (%s, %s) RETURNING id, username, email, created_at",
                    (username, email)
                )
                user = cur.fetchone()
                conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'id': user['id'],
                    'username': user['username'],
                    'email': user['email'],
                    'created_at': user['created_at'].isoformat()
                })
            }
        
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            user_id = params.get('id')
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if user_id:
                    cur.execute("SELECT id, username, email, created_at, last_login FROM users WHERE id = %s", (user_id,))
                    user = cur.fetchone()
                    if not user:
                        return {
                            'statusCode': 404,
                            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({'error': 'User not found'})
                        }
                    result = dict(user)
                    if result['created_at']:
                        result['created_at'] = result['created_at'].isoformat()
                    if result['last_login']:
                        result['last_login'] = result['last_login'].isoformat()
                else:
                    cur.execute("SELECT id, username, email, created_at FROM users ORDER BY created_at DESC LIMIT 50")
                    users = cur.fetchall()
                    result = []
                    for user in users:
                        u = dict(user)
                        if u['created_at']:
                            u['created_at'] = u['created_at'].isoformat()
                        result.append(u)
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result)
            }
    
    finally:
        conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
