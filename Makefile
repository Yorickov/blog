make install:
	npm install

dev:
	DEBUG=app* npm run nodemon -- --watch .  --ext '.js' --exec babel-node -- 'src/bin/start.js'

start:
	npx gulp run

build:
	rm -rf dist
	npm run build

test:
	npm test

test-watch:
	npm test -- --watchAll

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish

clean:
	rm -rf dist

.PHONY: test
