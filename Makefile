DOMAIN=cms.local

# Создание самоподписанного сертификата
install-certificates:
	echo "Очистка папки сертификатов"
	rm -rf .docker/nginx/certs
	mkdir .docker/nginx/certs
	echo "Началась установка сертификатов"
	mkcert -key-file .docker/nginx/certs/$(DOMAIN)-key.pem -cert-file .docker/nginx/certs/$(DOMAIN).pem $(DOMAIN)
	echo "Сертификаты сгенерированы в папку .docker/nginx/certs"

# Сборка Docker контейнеров и их запуск для старта локальной среды разработки в development режиме
dev-up:
	echo "Запускается локальная разработка в development режиме"
	docker compose -f .docker/docker-compose.dev.yml --profile development up
