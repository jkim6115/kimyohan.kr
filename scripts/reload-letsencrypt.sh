# 0 3 1 * * crontab 설정시 
docker run --rm -v /home/yhk/kimyohan.kr/certbot/conf:/etc/letsencrypt -v /home/yhk/kimyohan.kr/certbot/www:/var/www/certbot certbot/certbot renew --quiet && docker exec nginx-web nginx -s reload
