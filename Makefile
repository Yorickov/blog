make install:
	npm install

start:
	npx babel-node -- 'src/bin/start.js'

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
