import { Component } from '@angular/core';
import { isNumber } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Calculator-076';
  subText = ''; 
  mainText = ''; 
  operand1: number; 
  operand2: number; 
  operator = ''; 
  calculationString = '';
  answered = false;
  operatorSet = false;
  operandClear = false;
  temp = '';
  numTemp: number;

  pressKey(key: string)
  {
    if (key === '/' || key === 'x' || key === '-' || key === '+') {
      const lastKey = this.mainText[this.mainText.length - 1];
      if (lastKey === '/' || lastKey === 'x' || lastKey === '-' || lastKey === '+') {
        this.operatorSet = true;
      }
      if ((this.operatorSet) || (this.mainText === '')) {
        return;
      }
      this.operand1 = parseFloat(this.mainText);
      this.operator = key;
      this.operatorSet = true;
    }
    if (this.mainText.length === 12)
    {
      return;
    }
    this.mainText += key;
  }

  clearKey() {
    this.answered = true
    this.temp = this.mainText[this.mainText.length - 1]
    if (this.temp === '/' || this.temp === 'x' || this.temp === '-' || this.temp === '+') {
      this.operatorSet = false;
    }
    this.mainText = this.mainText.substr(0, this.mainText.length - 1)
    return this.mainText;
  }

  recall() {
    this.answered = false;
    this.operatorSet = false;
  }

  getAnswer() {
    this.answered=false
    this.calculationString = this.mainText;
    this.operand2 = parseFloat(this.mainText.split(this.operator)[1]);

    switch (this.operator) {
      case '/':
        this.subText = this.mainText;
        this.mainText = (this.operand1 / this.operand2).toString();
        this.subText = this.calculationString;
        if (this.mainText.length > 12) {
          if (this.mainText.indexOf('.') > 0) {
            this.numTemp = this.mainText.indexOf('.')
            this.mainText = this.mainText.substr(0, this.numTemp) + (this.mainText.substr(this.numTemp, this.numTemp + 6)).toString()
          }
          else {
            this.mainText = 'ERROR';
            this.subText = 'Range Exceeded';
          }
        }
        this.answered = true;
        this.recall();
        break;

      case 'x':
        this.subText = this.mainText;
        this.mainText = (this.operand1 * this.operand2).toString();
        this.subText = this.calculationString;
        if (this.mainText.length > 12) {
          if (this.mainText.indexOf('.') > 0) {
            this.numTemp = this.mainText.indexOf('.')
            this.mainText = this.mainText.substr(0, this.numTemp) + (this.mainText.substr(this.numTemp, this.numTemp + 6)).toString()
          }
          else {
            this.mainText = 'ERROR';
            this.subText = 'Range Exceeded';
          }
        }
        this.answered = true;
        this.recall();
        break;

      case '-':
        this.subText = this.mainText;
        this.mainText = (this.operand1 - this.operand2).toString();
        this.subText = this.calculationString;
        this.answered = true;
        this.recall();
        break;

      case '+':
        this.subText = this.mainText;
        this.mainText = (this.operand1 + this.operand2).toString();
        this.subText = this.calculationString;
        if (this.mainText.length > 12) {
          if (this.mainText.indexOf('.') > 0) {
            this.numTemp = this.mainText.indexOf('.')
            this.mainText = this.mainText.substr(0, this.numTemp) + (this.mainText.substr(this.numTemp, this.numTemp + 6)).toString()
          }
          else {
            this.mainText = 'ERROR';
            this.subText = 'Range Exceeded';
          }
        }
        this.answered = true;
        this.recall();
        break;

      default:
        this.subText = 'ERROR: Invalid Input';
        this.recall();
        break;
    }
    
  }
//location.reload() can also be used to remove all but it reloads the page
  allClear() {
    this.subText = '';
    this.mainText = '';
    this.operand1 = 0;
    this.operand2 = 0;
    this.operator = '';
    this.calculationString = '';
    this.answered = false;
    this.operatorSet = false;
    this.operandClear = false;
    this.temp = '';
    
  }
}
