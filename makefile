gendiff:
	node bin/gendiff

install:
	npm ci
lint:
	npx eslint .
test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js
test-coverage:
	node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage --coverageProvider=v8
fix:
	npx eslint . --fix