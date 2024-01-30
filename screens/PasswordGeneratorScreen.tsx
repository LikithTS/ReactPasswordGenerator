import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const PasswordSchema = Yup.object().shape({
    passwordLength : Yup.number()
    .min(4, 'Password length should be mininum of 4')
    .max(16, 'Password length should be not more than 16')
    .required('Password length is required')
})

export default function PasswordGeneratorScreen() {

    const [password, setPassword]  = useState('')
    const [isPasswordGenerated, setPasswordGeneratedData] = useState(false)
    const [lowerCase, setLowerCase]  = useState(true)
    const [upperCase, setUpperCase] = useState(false)
    const [number, setNumbers] = useState(true)
    const [symbols, setSymbols] = useState(false)

    const generatePasswordString  = (passwordLength: number) => {
        const upperCaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const lowerCaseChar = "abcdefghijklmnopqrstuvwxyz"
        const numbers = "0123456789"
        const specialChar = "@#$%&*!"

        let passwordChar = ''

        if(lowerCase) {
            passwordChar += lowerCaseChar
        }

        if(upperCase) {
            passwordChar += upperCaseChar
        }

        if(number) {
            passwordChar += numbers
        }

        if(symbols) {
            passwordChar += specialChar
        }

        const passwordResult = createPassword(passwordChar, passwordLength)
        console.log("Password Result "+passwordResult)

        if(passwordResult.length > 0) {
            setPassword(passwordResult)
            setPasswordGeneratedData(true)
        }
    }

    const createPassword = (characters : string, passwordLength: number) => {
        let result =  ''
        for(let i =0; i< passwordLength; i++) {
            const characterIndex = Math.round(Math.random() * characters.length)
            result += characters.charAt(characterIndex)
        }
        return result
    }

    const resetPasswordState = () => {
        setPassword('')
        setPasswordGeneratedData(false)
        setLowerCase(true)
        setUpperCase(false)
        setNumbers(true)
        setSymbols(false)
    }

  return (
    <View>
      <Text style = {styles.headingText}>PasswordGeneratorScreen</Text>
        <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema= {PasswordSchema}
            onSubmit={values => {
                console.log("Values "+values)
                generatePasswordString(+values.passwordLength)
            }}
        >
        {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleReset,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (
            <>
                <ScrollView>
                    <SafeAreaView>
                        <View style = {[styles.formContainer, styles.cardElevation]}>
                            <View style ={styles.inputFieldContainer}>
                                <Text style = {styles.fieldText}>Password Length : </Text>
                                <TextInput
                                    style={styles.inputTextField}
                                    onChangeText={handleChange('passwordLength')}
                                    value={values.passwordLength}
                                    placeholder="Ex : 8"
                                    keyboardType="numeric"
                                />
                            </View>

                            {/* Showing error here */}
                
                            {touched.passwordLength && errors.passwordLength && (
                                <Text style = {styles.errorText}>{errors.passwordLength}</Text>
                            )}

                            <View style = {styles.inputWrapper}>
                                <Text style  = {styles.checkBoxHeading}>Include LowerCase</Text>
                                <BouncyCheckbox
                                    disableBuiltInState
                                    isChecked = {lowerCase}
                                    onPress={ () => setLowerCase(!lowerCase)}
                                    fillColor='#019031'
                                    unfillColor='#75DA8B'
                                />
                            </View>

                            <View style = {styles.inputWrapper}>
                                <Text style  = {styles.checkBoxHeading}>Include UpperCase</Text>
                                <BouncyCheckbox
                                    disableBuiltInState
                                    isChecked = {upperCase}
                                    onPress={ () => setUpperCase(!upperCase)}
                                    fillColor='#019031'
                                    unfillColor='#75DA8B'
                                />
                            </View>

                            <View style = {styles.inputWrapper}>
                                <Text style  = {styles.checkBoxHeading}>Include Numbers</Text>
                                <BouncyCheckbox
                                    disableBuiltInState
                                    isChecked = {number}
                                    onPress={ () => setNumbers(!number)}
                                    fillColor='#019031'
                                    unfillColor='#75DA8B'
                                />
                            </View>

                            <View style = {styles.inputWrapper}>
                                <Text style  = {styles.checkBoxHeading}>Include Symbols</Text>
                                <BouncyCheckbox
                                    isChecked = {symbols}
                                    onPress={ () => setSymbols(!symbols)}
                                    fillColor='#019031'
                                    unfillColor='#75DA8B'
                                />
                            </View>

                            <View style = {styles.formActions}>
                                <TouchableOpacity disabled = {!isValid} onPress={ () => handleSubmit()} style = {styles.actionButtonOne}>
                                    <Text style = {styles.actionButtonText}>Generate Password</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => {
                                    handleReset()
                                    resetPasswordState()
                                    }} style = {styles.actionButtonTwo}>
                                    <Text style = {styles.actionButtonText}>Reset Form</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </>
        )}
     </Formik>

     { isPasswordGenerated ? (
        <View style = {[styles.passwordCard, styles.passwordCardElevated]}>
            <Text style = {styles.newPasswordHeading}>
                Long press generated password to copy
            </Text>
            <Text style  = {styles.newPasswordText} selectable = {true}>
                {password}
            </Text>
        </View>
     ) : null}


    </View>
  )
}

const styles = StyleSheet.create({
    headingText : {
        fontSize : 20,
        fontWeight : "bold",
        paddingStart : 20,
        paddingTop : 10,
        paddingBottom: 20
    },
    formContainer: {
        borderRadius : 4,
        height : 400,
        margin : 10
    },
    cardElevation: {
        backgroundColor : '#487EB0'
    },
    inputFieldContainer: {
        flex : 1,
        flexDirection: 'row'
    },
    fieldText: {
        color : "#FFFFFF",
        fontSize : 16,
        marginStart : 10,
        marginTop : 20,
        flex : 1,
        justifyContent: 'center'
    },
    inputTextField: {
        height : 60,
        flex : 1.5,
        backgroundColor : "#FFFFFF",
        margin : 10,
        borderRadius : 6
    },
    formActions : {
        flexDirection : 'row',
    },
    actionButtonOne : {
        flex : 1,
        alignItems : 'center',
        backgroundColor : "#99AAAB",
        justifyContent : 'center',
        height : 60,
        margin : 10,
        borderRadius : 10,
    },
    actionButtonTwo : {
        flex : 1,
        alignItems : 'center',
        backgroundColor : "#DAE0E2",
        justifyContent : 'center',
        height : 60,
        margin : 10,
        borderRadius : 10
    },
    actionButtonText : {
        fontSize: 15,
        fontWeight: '600'
    },
    errorText : {
        fontSize : 12,
        fontWeight : '500',
        color : '#BA2F16'
    },
    inputWrapper : {
        flexDirection : 'row',
    },
    checkBoxHeading : {
        fontSize : 16,
        margin : 8,
        color : '#FFFFFF',
        flexGrow : 1
    },
    newPasswordHeading : {
        fontSize : 18,
        margin : 8,
        color : '#FFFFFF',
    },
    newPasswordText : {
        fontSize : 18,
        margin : 8,
        color : '#0000000',
        alignItems : 'center'
    },
    passwordCard : {
        height : 100,
        margin : 10,
        justifyContent : 'center',
    },
    passwordCardElevated : {
        backgroundColor : '#0ABDE3',
        borderRadius : 8
    }
})