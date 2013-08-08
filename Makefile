
test:
	./node_modules/mocha/bin/mocha -R list --timeout 500000 test/test.js

.PHONY: test
