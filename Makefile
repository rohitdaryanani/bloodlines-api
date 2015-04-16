.PHONY: all test

all:
	make populate; npm test; make drop

populate:
	mongoimport -d test -c people people.json

drop:
	echo "Deleting DB..."
	mongo test --eval "db.dropDatabase()" > /dev/null

test:
	npm test
