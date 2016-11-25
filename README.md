### eComm FE
______
#### Setup
##### 1. Clone the project
````
git clone git@github.com:CleverSoftwareSolutions/eComm-FE.git
```

##### 2. Install nvm and node v7.2.0
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
nvm install 7.2.0
```
##### 3. Install npm modules
```
npm install
```
___________
#### Linter setup
##### 1. Install the following SublimeText packages:
 - SublimeLinter
 - SublimeLinter-contrib-eslint
 - ESLint

##### 2. Set the "node_modules_path" in ESLint Settings

##### 3. Reenable your SublimeLinter (Disable Linter -> Enable Linter)

___________
#### Running the site locally
```
npm run dev
```  
Website can be found at `localhost:3000`

#### Lint all the files
```
npm run lint
```

#### Lint staged for commit files
```
npm run lint-staged
```

NOTE: You will be not able to commit if you changes contains errors.