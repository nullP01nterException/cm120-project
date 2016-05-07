var state = 0;
function mouseClicked(eventParams) {
  state++;
  if(state == 3) state = 0;
  console.log(state);
}