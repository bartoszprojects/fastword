# FastWord App Makefile

# main docker commands
build:
	docker-compose build
up:
	docker-compose up
destroy:
	docker rm -f $(docker ps -a -q) && docker volume prune && docker system prune -a

# inside containers commands
migrate:
	docker exec fw-backend python init-db.py
opendb:
	docker exec -ti fw-database bash "-c" "psql -d postgres -U postgres"

