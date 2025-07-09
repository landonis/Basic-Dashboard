#!/bin/bash
CERT_DIR="/etc/ssl/minecraft-dashboard"
DOMAIN="localhost"

sudo mkdir -p $CERT_DIR
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout $CERT_DIR/selfsigned.key \
  -out $CERT_DIR/selfsigned.crt \
  -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=$DOMAIN"
