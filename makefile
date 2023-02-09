gendiff:
	node bin/gendiff

install:
	npm ci
lint:
	npx eslint --fix .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
fix:
	npx eslint . --fix