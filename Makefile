php-fpm:
	docker-compose exec php-fpm bash

dashboard:
	docker-compose exec dashboard bash

node-dashboard-serve:
	docker-compose exec dashboard ng serve --host 0.0.0.0
supervisor-start
    docker-compose exec php-fpm service supervisor start
supervisor-stop
    docker-compose exec php-fpm service supervisor stop

echo-server:
    docker-compose exec echo-server bash

echo-server-start:
    docker-compose exec echo-server laravel-echo-server start
