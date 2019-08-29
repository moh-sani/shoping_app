import 'package:flutter/material.dart';

//import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'forgot_password.dart';
import './home_screen.dart';

class SignInScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _SignInState();
  }
}

class _SignInState extends State<SignInScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(32.0, 16.0, 32.0, 16.0),
          child: ListView(
            shrinkWrap: true,
            //mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            //mainAxisSize: MainAxisSize.max,
            // verticalDirection: VerticalDirection.down,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(bottom: 16.0),
                child: Text(
                  'PILGRIM LOCATOR',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    //backgroundColor: Colors.black,
                    letterSpacing: 3.0,
                    fontSize: 32.0,
                    color: Color.fromRGBO(255, 215, 0, 1),
                  ),
                ),
              ),
              Image.asset('images/logo.png',
              height: 65.0,),
              SizedBox(
                height: 75.0,
              ),
              Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: <Widget>[
                    TextField(
                      keyboardType: TextInputType.emailAddress,
                      controller: TextEditingController(),
                      cursorColor: Color.fromRGBO(255, 215, 0, 1),
                      autofocus: false,
                      decoration: InputDecoration(
                        alignLabelWithHint: true,
                        labelText: 'Email',
                        prefixIcon: Icon(
                          Icons.mail_outline,
                          color: Colors.black,
                        ),
                        contentPadding: EdgeInsets.fromLTRB(20, 15, 20, 15),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(25.0)),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 15.0,
                    ),
                    TextField(
                      controller: TextEditingController(),
                      cursorColor: Color.fromRGBO(255, 215, 0, 1),
                      obscureText: true,
                      autofocus: false,
                      decoration: InputDecoration(
                        labelText: 'password',
                        prefixIcon: Icon(
                          Icons.lock_outline,
                          color: Colors.black,
                        ),
                        contentPadding: EdgeInsets.fromLTRB(20, 15, 20, 15),
                        border: OutlineInputBorder(
                          borderSide: BorderSide(style: BorderStyle.solid),
                          borderRadius: BorderRadius.circular(28.0),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: 42.0,
              ),
              Padding(
                padding: const EdgeInsets.only(left: 45.0, right: 45.0),
                child: InkWell(
                  child: RaisedButton(
                    elevation: 10.0,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.0)),
                    textColor: Color.fromRGBO(255, 215, 0, 1),
                    color: Colors.black,
                    child: Padding(
                      padding: const EdgeInsets.only(left: 16.0, right: 16.0),
                      child: Text('SignIn'),
                    ),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => HomeScreen(),
                        ),
                      );
                    },
                  ),
                ),
              ),
              SizedBox(
                height: 15.0,
              ),
              FlatButton(
                  child: Text(
                    'Forgot password',
                    style: TextStyle(
                      color: Color.fromRGBO(255, 215, 0, 1),
                      fontStyle: FontStyle.italic,
                    ),
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => ForgotPassword()),
                    );
                  })
            ],
          ),
        ),
      ),
    );
  }
}
