function convert() {
    const inputValue = document.getElementById('inputValue').value.trim();
    const fromBase = document.getElementById('fromBase').value;
    const toBase = document.getElementById('toBase').value;
    let outputValue = '';

    if (!inputValue) {
        alert("Please enter a value to convert.");
        return;
    }

    try {
        let num;

        // Determine the input number based on the base
        if (fromBase === 'binary') {
            num = parseInt(inputValue, 2);
        } else if (fromBase === 'decimal') {
            num = parseInt(inputValue, 10);
        } else if (fromBase === 'hexadecimal') {
            num = parseInt(inputValue, 16);
        } else if (fromBase === 'octal') {
            num = parseInt(inputValue, 8);
        } else if (fromBase === 'text') {
            const charCodes = Array.from(inputValue).map(char => char.charCodeAt(0));

            // Convert based on the target base
            if (toBase === 'binary') {
                outputValue = charCodes.map(code => code.toString(2)).join(' ');
            } else if (toBase === 'decimal') {
                outputValue = charCodes.join(' ');
            } else if (toBase === 'hexadecimal') {
                outputValue = charCodes.map(code => code.toString(16).toUpperCase()).join(' ');
            } else if (toBase === 'octal') {
                outputValue = charCodes.map(code => code.toString(8)).join(' ');
            } else {
                outputValue = inputValue; // If it's the same base
            }

            document.getElementById('outputValue').value = outputValue;
            return; // Early return since no further conversion is needed
        }

        // Check for NaN
        if (isNaN(num)) throw new Error("Invalid input for conversion.");

        // Convert to the desired base
        if (toBase === 'binary') {
            outputValue = num.toString(2);
        } else if (toBase === 'decimal') {
            outputValue = num.toString(10);
        } else if (toBase === 'hexadecimal') {
            outputValue = num.toString(16).toUpperCase();
        } else if (toBase === 'octal') {
            outputValue = num.toString(8);
        } else if (toBase === 'text') {
            // Convert number to text (ASCII)
            if (fromBase === 'binary' || fromBase === 'decimal' || fromBase === 'hexadecimal' || fromBase === 'octal') {
                const charCodes = [];
                const inputs = inputValue.split(' '); // Split by space for multiple character codes
                for (let input of inputs) {
                    let code;
                    if (fromBase === 'binary') {
                        code = parseInt(input, 2);
                    } else if (fromBase === 'decimal') {
                        code = parseInt(input, 10);
                    } else if (fromBase === 'hexadecimal') {
                        code = parseInt(input, 16);
                    } else if (fromBase === 'octal') {
                        code = parseInt(input, 8);
                    }
                    if (!isNaN(code)) {
                        charCodes.push(String.fromCharCode(code));
                    }
                }
                outputValue = charCodes.join(''); // Join back to a string
            } else {
                outputValue = inputValue; // If input is already text
            }
        } else {
            outputValue = inputValue; // If it's the same base
        }

        document.getElementById('outputValue').value = outputValue;

    } catch (error) {
        alert(error.message);
    }
}
