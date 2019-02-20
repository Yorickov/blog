make install:
	npm install

dev:
	DEBUG=app* npm run nodemon -- --watch .  --ext '.js' --exec npm run gulp -- server

prod:
	npm start

build:
	rm -rf public
	npm run build

test:
	npm test

test-watch:
	npm test -- --watchAll

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

clean:
	rm -rf public

.PHONY: test
