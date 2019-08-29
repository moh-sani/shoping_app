import 'package:flutter/material.dart';

import './signin_screen.dart';
import './signup_screen.dart';

class LoginScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _LoginScreenState();
  }
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            mainAxisSize: MainAxisSize.max,
            children: <Widget>[
              Image.asset('images/logo.png',
              height: 130,),
              Container(
                padding: EdgeInsets.all(16.0),
                decoration: BoxDecoration(
                    //color: Colors.black,
                    borderRadius: BorderRadius.circular(30.0)),
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
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  InkWell(
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
                            builder: (context) => SignInScreen(),
                          ),
                        );
                      },
                    ),
                  ),
                  InkWell(
                    child: RaisedButton(
                      elevation: 10.0,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20.0)),
                      textColor: Color.fromRGBO(255, 215, 0, 1),
                      color: Colors.black,
                      child: Padding(
                        padding: const EdgeInsets.only(left: 16.0, right: 16.0),
                        child: Text('SignUp'),
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => SignUpScreen(),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
