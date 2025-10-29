import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Учёт скачиваний клиента и статистика
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
            version = body_data.get('version', 'v2.5.0')
            
            headers = event.get('headers', {})
            ip_address = headers.get('x-forwarded-for', '').split(',')[0].strip() or headers.get('x-real-ip', 'unknown')
            user_agent = headers.get('user-agent', 'unknown')
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "INSERT INTO downloads (user_id, version, ip_address, user_agent) VALUES (%s, %s, %s, %s) RETURNING id, version, downloaded_at",
                    (user_id, version, ip_address, user_agent)
                )
                download = cur.fetchone()
                conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'id': download['id'],
                    'version': download['version'],
                    'downloaded_at': download['downloaded_at'].isoformat()
                })
            }
        
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            stats = params.get('stats', 'false').lower() == 'true'
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if stats:
                    cur.execute("""
                        SELECT 
                            version,
                            COUNT(*) as total_downloads,
                            COUNT(DISTINCT ip_address) as unique_downloads
                        FROM downloads 
                        GROUP BY version 
                        ORDER BY total_downloads DESC
                    """)
                    stats_data = cur.fetchall()
                    result = [dict(row) for row in stats_data]
                else:
                    cur.execute(
                        "SELECT id, version, ip_address, downloaded_at FROM downloads ORDER BY downloaded_at DESC LIMIT 100"
                    )
                    downloads = cur.fetchall()
                    result = []
                    for download in downloads:
                        d = dict(download)
                        if d['downloaded_at']:
                            d['downloaded_at'] = d['downloaded_at'].isoformat()
                        result.append(d)
            
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
