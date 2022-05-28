import React, { Component } from 'react';
import * as RandExp from "randexp";
import {
    padding,
    hexList,
    inputKey,
} from './Auxiliary'

import {
    SelectInput, Input, ErrorMessage,
    Mode, SelectMode, InputIV,
    Key, InputKey,
    Execution, Encrypt, Decrypt,
    Output, SelectOutput, OutputBox

} from './styles.js';


const validHex = RegExp('^(?:[0-9A-Fa-f]{2} ){0,31}[0-9A-Fa-f]{2}$');
const validBase64 = RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$');

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {

            selectedInput: 'Hex',
            input: null,

            selectedMode: "ECB",


            key: null,

            errors: {
                input: '',
                key: '',
            }
        };

    }

    createIV = (event) => {
        document.getElementById("inputIV").value = new RandExp('^([0-9A-Fa-f]{2}[ ]){' + this.props.IVlength + '}([0-9A-Fa-f]{2})$').gen();
    }

    createKey = (event) => {
        document.getElementById("key").value = new RandExp('^([0-9A-Fa-f]{2}[ ]){' + this.props.Keylength + '}([0-9A-Fa-f]{2})$').gen();
        this.setState({ key: document.getElementById("key").value });
    }

    setFormatOption = (event) => {
        this.setState({ selectedInput: event.target.value });
    }

    setModeOption = (event) => {
        this.setState({ selectedMode: event.target.value });
        if (event.target.value === "ECB") {
            document.getElementById('inputIV').disabled = true;
            document.getElementById('inputIV').placeholder = "IV not required for ECB";
        } else {
            document.getElementById('inputIV').disabled = false;
            document.getElementById('inputIV').placeholder = "Enter IV";
        }
    }


    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'input':
                if (this.state.selectedInput === 'Hex') {
                    errors.input = validHex.test(value)
                        ? ''
                        : 'Invalid format. Please type in Hex. Do not include a space at the end.';
                    break;
                } else if (this.state.selectedInput === 'Base64') {
                    errors.input = validBase64.test(value)
                        ? ''
                        : 'Invalid format. Please type in Base64 encoding';
                    break;
                }
            case 'key':
                errors.key = this.props.KeyFormat.test(value)
                    ? ''
                    : 'Invalid key. Please type in hex a key of 10 bytes';
                break;
        }
        this.setState({ errors, [name]: value });
    };

    encrypt = () => {
        //document.getElementById("output").value = hexList(this.props.size, this.state.input.replace(/\s/g, ''));
        //document.getElementById("output").value = inputKey(this.state.key.replace(/\s/g, ''));
        //document.getElementById("output").value = this.state.selectedMode;


        document.getElementById("output").value = this.props.ENCRYPT(
            hexList(this.props.size, padding(this.state.input.replace(/\s/g, ''))),
            inputKey(this.state.key.replace(/\s/g, '')),
            this.state.selectedMode,
            " "
        );
    }


    //Form values
    render() {
        const { errors } = this.state;
        return (
            <div>
                <Input>
                    {/* Select form for Input formats */}
                    <SelectInput>
                        <select onChange={this.setFormatOption}>
                            <option value="Hex"> Hex</option>
                            <option value="Base64"> Base64</option>
                        </select>
                    </SelectInput>

                    {/* Input form */}
                    <textarea name='input' placeholder="Type input here" onChange={this.handleChange} noValidate />
                    <ErrorMessage>
                        {errors.input.length > 0 &&
                            <span>{errors.input}</span>}
                    </ErrorMessage>
                </Input>

                <Mode>
                    <SelectMode onChange={this.setModeOption}>
                        <option value=""> Select Mode </option>
                        <option value="ECB">ECB - Electronic Codebook</option>
                        <option value="CBC">CBC - Cipher block chaining</option>
                        <option value="CFB">CFB - Cipher feedback</option>
                        <option value="OFB">OFB - Output feedback</option>
                    </SelectMode>

                    <InputIV placeholder="Enter IV" id="inputIV" />

                    <button onClick={this.createIV}> Generate random IV </button>
                </Mode>

                <Key>
                    <InputKey name='key' placeholder="Enter key" id="key" onChange={this.handleChange} noValidate></InputKey>
                    <button onClick={this.createKey}> Genenerate random key </button>

                    <ErrorMessage>
                        {errors.key.length > 0 &&
                            <span>{errors.key}</span>}
                    </ErrorMessage>

                </Key>

                <Execution>
                    <Encrypt onClick={this.encrypt}> Encrypt </Encrypt>
                    <Decrypt> Decrypt </Decrypt>
                </Execution>

                <Output>
                    <SelectOutput  >
                        <option value="Hex"> Hex</option>
                        <option value="Base64"> Base64</option>
                    </SelectOutput>
                    <OutputBox id="output" disabled>

                    </OutputBox>
                </Output>
            </div>

        );
    }
}