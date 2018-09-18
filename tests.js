//Step 1: load path and express
const express = require("express");
const path = require("path");
const fs = require('fs');
const randomFile = require('random-file')

const dir = '/home/selamat/fsf/ssf/ssf-day2workshop/images'
x=randomFile(dir, (err, file) => {
    //   console.log(`The random file is: ${file}.`)
    if (err) {
        console.log(err);
    } else if (!file) {
        console.log("no files in /temp/myapp");
    } else {
        console.log("random filename is " + file);
    }
})
console.log(`The random file is:`,x);