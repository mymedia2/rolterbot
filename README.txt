Первый Telegram бот-поисковик для быстрого нахождения стикеров.

./robot.sh -- точка хода для CGI сценария. Нужно настроить веб-сервер так, чтобы
запросы по адресу https://$DOMAIN/webhook/$SECRET попадали к этому сценарию.
Пример подобной конфигурации смотрите в файле apache-prod.conf. Например, его
можно скопировать в папку /etc/apache2/sites-available и дополнить сверху
директивами Define с определениями всех используемых там переменных либо вручную
заменить их имена подходящими значениями. После командой a2ensite включите сайт,
если потребуется, модули-зависимости и перезапустите Apache. Для других серверов
настройка аналогична.

После этих манипуляций надо запросить обновления из Telegram. Для этого
выполнить команду ./robot.sh --set-webhook $DOMAIN $SECRET.

Зависимости (пакеты Debian): jshon, curl, sqlite3, apache2 | httpd-cgi
