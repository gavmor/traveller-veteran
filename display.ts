import * as blessed from "blessed";
import * as contrib from "blessed-contrib";

const screen = blessed.screen()
const line = contrib.line({ style:
           { line: "yellow"
           , text: "green"
           , baseline: "black"}
         , xLabelPadding: 3
         , xPadding: 5
         , label: 'Line Example'})
     
screen.append(line)
line.setData({
    x: ['t1', 't2', 't3', 't4'],
    y: [5, 1, 7, 5]
 })

screen.render();