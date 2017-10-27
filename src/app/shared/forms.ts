function getInputValue(elementID: string): string | undefined {

  const inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById(elementID);

  if (inputElement.value === '') {
    return undefined;
  }
  else {
    return inputElement.value;
  }
}
export class Forms {

}
