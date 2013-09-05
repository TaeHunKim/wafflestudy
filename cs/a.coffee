fac = (n) ->
  if n is 1 then 1 else n * fac(n-1)
console.log fac(i) for i in [1..10]
