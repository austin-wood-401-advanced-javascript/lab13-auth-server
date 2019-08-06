# LAB - 13

## Lab -13

### Author: Austin Wood

### Links and Resources

* [submission PR](https://github.com/austin-wood-401-advanced-javascript/lab13-auth-server/pull/3) 

* [travis]([![Build Status](https://www.travis-ci.com/austin-wood-401-advanced-javascript/lab13-auth-server.svg?branch=master)](https://www.travis-ci.com/austin-wood-401-advanced-javascript/lab13-auth-server))


#### To test run:
signing up users: echo '{"username":"<name>", "password":"<password>", "role":"editor"}'| http post https://auth-server-aw.herokuapp.com/signup

basic sign-in: http post https://auth-server-aw.herokuapp.com/signin -a <name>:<password>

authenticated sign-in: http post https://auth-server-aw.herokuapp.com/signin "authorization:bearer header.payload.signature"

adding roles to db: echo '{"role":"<role title>", "capabilities":["<capability>","<capability>","<capability>"]}'| http post https://auth-server-aw.herokuapp.com/roles

testing the general auth capability: http https://auth-server-aw.herokuapp.com/hidden-stuff "authorization:bearer header.payload.signature"

testing the read capability: http https://auth-server-aw.herokuapp.com/some-thing-to-read "authorization:bearer header.payload.signature"

testing the create capability: http post https://auth-server-aw.herokuapp.com/create-a-thing "authorization:bearer header.payload.signature"

testing the update capability: http put https://auth-server-aw.herokuapp.com/update "authorization:bearer header.payload.signature"

testing the patch capability: http patch https://auth-server-aw.herokuapp.com/jp "authorization:bearer header.payload.signature"

testing the delete capability: http delete https://auth-server-aw.herokuapp.com/bye-bye "authorization:bearer header.payload.signature"

testing the capability: http https://auth-server-aw.herokuapp.com/everything "authorization:bearer header.payload.signature"
