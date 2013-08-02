function fib_in(i){
  if(i == 0) {return 1;}
  else if (i == 1) {return 1;}
  else {return fib_in(i-1)+fib_in(i-2);}
}

var string = "";
for(j=0;j<5;j++){
  if(j==4)
    string += fib_in(j).toString();
  else 
    string += fib_in(j) + ", ";
}
console.log(string);
