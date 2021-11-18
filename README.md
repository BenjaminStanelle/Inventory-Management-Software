# Inventory-Management-Software
Developed by: Dat Tien Nguyen, Tu Mai, Benjamin Stanelle, and Randall Ferree

How to install:
navigate into the stock-up folder, then npm install (all dependencies that you need to install are in package.json in stock-up folder), 
example in stock-up folder: npm install nodemon mongoose express
(if you get errors with this, delete your node_modules folder, then:npm install)

navigate to client folder then go to the package.json file and npm install all the dependencies in order 1 by 1 while in the client directory in your terminal
in addition to these ^^^^ depedencies install this is the same client directory: npm install --save-dev @testing-library/jest-dom


How to run:
open stock-up folder in visual studios code
Navigate to client folder and type in terminal:npm start


Connect to MongoDB:

On MongoDB compass application
reproduct "ben-stanelle" with your name.
ferree-randall
dat-nguyen
tu-mai
mongodb+srv://ben-stanelle:123Qwe@crud.xwprk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

In application:
go into stock up folder and navigate to "config.env", in this file were it says "DATABASE = " put 
mongodb+srv://ben-stanelle:123Qwe@crud.xwprk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
with your specific login name replacing ben-stanelle.