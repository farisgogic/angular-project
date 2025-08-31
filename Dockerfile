
FROM node:16-alpine3.11 AS angular

WORKDIR /app


COPY . .

RUN npm install
RUN npm run build


FROM httpd:alpine3.15

# Enable rewrite module for Angular routing
RUN sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf

# Enable .htaccess files
RUN sed -i 's/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

WORKDIR /usr/local/apache2/htdocs

COPY --from=angular /app/docs .
COPY .htaccess .