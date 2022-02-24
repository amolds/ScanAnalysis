Install typescript into global npm eg npm install -g typescript

To compile a typescript file run tsc <file>

----------

GitHub instructions

1. Sign in to GitHub
2. Create a new repository eg ScanAnalysis
3. Make it public and give it a meaningful description and select 'Create repository'
4. NOTE the section on "...or create a new repository on the command line"
execute those instructions

git add .
git commit -m "First commit"
git remote add origin https://github.com/amolds/ScanAnalysis.git
git push --set-upstream origin master

----------

When working on a feature; create a branch of the form feature/<purpose> eg git co -b feature/<purpose>
Code the feature
When complete commit the changes and push up the feature branch eg get add . followed by git commit -m "reason for feature" followed by git push
Once in github create a PR

----------

sass / css

Install sass via npm globally
sass scan.scss > ./scan.css
