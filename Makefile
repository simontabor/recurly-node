
test:
	./node_modules/mocha/bin/mocha -R list --timeout 5000 test/test.js

.PHONY: test
