#!/bin/bash

    gnome-terminal -- /bin/bash -c  'npm run server; exec bash;'
    gnome-terminal -- /bin/bash -c  'sleep 5;npm run start; exec bash;'


 