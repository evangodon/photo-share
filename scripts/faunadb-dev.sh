docker run --rm --name faunadb -p 8443:8443 \
    -v ~/code/react/photo-app:/var/lib/faunadb \
    fauna/faunadb