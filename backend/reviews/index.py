import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Создание и получение отзывов о клиенте
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id
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
            user_id = body_data.get('user_id')
            rating = body_data.get('rating')
            comment = body_data.get('comment', '').strip()
            version = body_data.get('version', 'v2.5.0')
            
            if not rating or rating < 1 or rating > 5:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Rating must be between 1 and 5'})
                }
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "INSERT INTO reviews (user_id, rating, comment, version) VALUES (%s, %s, %s, %s) RETURNING id, rating, comment, version, created_at",
                    (user_id, rating, comment, version)
                )
                review = cur.fetchone()
                conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'id': review['id'],
                    'rating': review['rating'],
                    'comment': review['comment'],
                    'version': review['version'],
                    'created_at': review['created_at'].isoformat()
                })
            }
        
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            version = params.get('version')
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if version:
                    cur.execute(
                        "SELECT r.id, r.rating, r.comment, r.version, r.created_at, u.username FROM reviews r LEFT JOIN users u ON r.user_id = u.id WHERE r.version = %s ORDER BY r.created_at DESC LIMIT 50",
                        (version,)
                    )
                else:
                    cur.execute(
                        "SELECT r.id, r.rating, r.comment, r.version, r.created_at, u.username FROM reviews r LEFT JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC LIMIT 50"
                    )
                
                reviews = cur.fetchall()
                result = []
                for review in reviews:
                    r = dict(review)
                    if r['created_at']:
                        r['created_at'] = r['created_at'].isoformat()
                    result.append(r)
            
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
