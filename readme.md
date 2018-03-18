Hello,

The Github link to the project https://github.com/martialmarel/rest-api-with-mongoose

The architecture of the project is as follows:

	.
	├── config
	│   ├── config.development.js
	│   ├── config.test.js
	│   └── index.js
	├── helpers
	│   └── uptime.js
	├── models
	│   ├── account.js
	│   └── db.js
	├── package-lock.json
	├── package.json
	├── readme.md
	├── routes
	│   ├── accounts.js
	│   └── index.js
	├── server.js
	└── test
		├── curl.sh
		├── helpers.js
		├── mocha.opts
		└── routes
			├── accounts.js
			└── index.js


The file routes/index.js  will load the accounts.js file containing the routes that match with the a patter /accounts/
The route GET / : returns the server status. The returned response contains two keys: the last time the Express.js server was started, and the current time at the time of the request.

To test the REST API, i implement automated test using the following libraries:

* Mocha: to launch the tests
* Chai: library of assertions, by privileging the use of the function "expect" instead of "should" which alters each object by adding to the prototype the function should.
* Supertest: library for testing node.js HTTP servers using a fluent API

The test instructions are in the "/test" directory.
As this is a REST API to test, I only implemented test sets for routes. 
I therefore reproduced in the "test" directory the same architecture as the application:

	.
	├── routes
	│   ├── accounts.js
	│   └── index.js
	└── test
		└── routes
			├── accounts.js
			└── index.js

The execution of test sets is launched by the command "npm test"
In first time declare the node environment to "test" (NODE_ENV = test) and then run Mocha with the path to the test files to be executed.

Implicitly Mocha will interpret the file /test/mocha.opts which contains other launch options passed to Mocha.

	--require test/helpers /* load the file helpers.js */
	
	--reporter spec /* the format of the result report displayed in the console */
	
	--slow 5000 /* time expressed in milliseconds beyond which we consider, to report this timeout */
	
	--exit /* force shutdown of the event after test run: mocha will call process.exit */


Starting NODE in another environment (test) will allow the server application to load a different configuration file than the configuration development.

This has the effect of allowing to declare a different database for the tests.
So before each test run, we can empty the database of tests, in order to have control of the state of data present in the database.

Each test statement in the /test/routes/accounts.js file will launch a request(s) with the corresponding HTTP method according to the specified scenario.

Several assertions will be executed on the returned response to ensure that is compliant when the data is valid or invalid: HTTP code, error message, etc.

For the syntax quality of the code, Eslint has been added in order to have a code written in a uniform way.


The project proposes the different commands:

	npm run dev: launches nodemon and starts the express server
	
	npm run test: run the test suite
	
	npm run lint: performs syntax checking on JS files, to validate their compliance with the standard defined in the .eslintrc.json file
	
	npm run clean: removes project node_modules directory


-----------------------------------------

Bonjour,

Le lien Github vers le projet https://github.com/martialmarel/rest-api-with-mongoose

L'architecture du projet est la suivante :

	.
	├── config
	│   ├── config.development.js
	│   ├── config.test.js
	│   └── index.js
	├── helpers
	│   └── uptime.js
	├── models
	│   ├── account.js
	│   └── db.js
	├── package-lock.json
	├── package.json
	├── readme.md
	├── routes
	│   ├── accounts.js
	│   └── index.js
	├── server.js
	└── test
		├── curl.sh
		├── helpers.js
		├── mocha.opts
		└── routes
			├── accounts.js
			└── index.js


Le fichier routes/index.js va charger le fichier accounts.js contenant les routes répondant au motif /accounts/
La route GET / : retourne le statut serveur. La réponse retournée contient deux clés : le temps du dernier démarrage du serveur express.js, et le temps courant au moment de la requête.

Pour pouvoir tester le bon fonctionnement de l'API REST, implémentations de tests automatisés en utilisant les librairies suivantes :

* Mocha : pour lancer les tests
* Chai : librairie d'assertions, en privilégiant l'usage de la fonction "expect" au lieu de "should » qui altère chaque objet en ajoutant au prototype la fonction should.
* Supertest : librairie de test HTTP avec une api "fluent"

Les instructions de tests se trouvent dans le répertoire "/test".
S’agissant d'une API REST à tester, je n'ai implémenté que des jeux de test pour les routes. J'ai donc reproduit dans le répertoire "test" la même architecture que l'application :

	.
	├── routes
	│   ├── accounts.js
	│   └── index.js
	└── test
		└── routes
			├── accounts.js
			└── index.js

L'exécution des jeux de tests est déclenchée par la commande "npm test".
Cette dernière va auparavant déclarer l'environnement de node en "test" (NODE_ENV=test) puis lancer Mocha avec le chemin vers les fichiers de test à exécuté.
Implicitement Mocha va interpréter le fichier test/mocha.opts qui contient d'autres options de lancement passé à Mocha.

	--require test/helpers // charge le fichier helpers.js
	
	--reporter spec // le format du rapport de résultat affiché dans la console
	
	--slow 5000 // temps exprimé en millisecondes au-delà duquel on considère, qu'il faut rapporter ce dépassement de temps
	
	--exit  //  Stop l'éxécution du proccess de test à la fin des scénarios


Le fait de lancer NODE dans un autre environnement (test) va permettre au démarrage de l'application serveur de charger un fichier de configuration différent de celui de développement.

Cela à pour effet de permettre de renseigner une base de données différente pour les tests.

Ainsi avant chaque test exécuté, on pourra vider la base de données de tests, dans le but d'avoir la maîtrise de l'état des données présentes en base.

Chaque instruction de test décris dans le fichier test/routes/accounts.js va lancé une/des requête(s) avec la méthode HTTP correspondant selon le scénario spécifié.

Plusieurs assertions vont être exécutées sur la réponse retournée afin de s'assurer que est conforme quand les données sont valides ou  invalide : code HTTP, message d'erreur, etc.

Pour la qualité de syntaxe du code, Eslint a été ajouté afin d'avoir un code écrit de manière uniforme.


Le projet propose les différentes commandes :

    npm run dev : lance nodemon et démarre le serveur express
	
    npm run test : lance l'exécution de la suite de tests
	
	npm run lint : exécute le contrôle de syntaxe sur les fichiers JS, afin de valider leur conformité au standard définit dans le fichier .eslintrc.json
	
	npm run clean : supprime le répertoire node_modules du projet


