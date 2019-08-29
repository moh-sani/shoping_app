import 'package:flutter/material.dart';

class SignUpScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _SignUpState();
  }
}

class _SignUpState extends State<SignUpScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 15.0,
        backgroundColor: Colors.black,
        titleSpacing: 5.0,
        centerTitle: true,
        title: Text(
          'SignUp',
          style: TextStyle(
            color: Color.fromRGBO(255, 215, 0, 1),
          ),
        ),
      ),
      body: Center(
        child: ListView(
                  children: <Widget>[
                    Padding(
            padding: const EdgeInsets.all(32.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              mainAxisSize: MainAxisSize.max,
              children: <Widget>[
                TextField(
                  keyboardType: TextInputType.emailAddress,
                  controller: TextEditingController(),
                  cursorColor: Color.fromRGBO(255, 215, 0, 1),
                  autofocus: false,
                  decoration: InputDecoration(
                    alignLabelWithHint: true,
                    labelText: 'Name',
                    prefixIcon: Icon(
                      Icons.person_outline,
                      color: Colors.black,
                    ),
                    contentPadding: EdgeInsets.fromLTRB(20, 15, 20, 15),
                  ),
                ),
                TextField(
                  keyboardType: TextInputType.emailAddress,
                  controller: TextEditingController(),
                  cursorColor: Color.fromRGBO(255, 215, 0, 1),
                  autofocus: false,
                  decoration: InputDecoration(
                    alignLabelWithHint: true,
                    labelText: 'Email',
                    prefixIcon: Icon(
                      Icons.email,
                      color: Colors.black,
                    ),
                    contentPadding: EdgeInsets.fromLTRB(20, 15, 20, 15),
                  ),
                ),
                TextField(
                  controller: TextEditingController(),
                  cursorColor: Color.fromRGBO(255, 215, 0, 1),
                  obscureText: true,
                  autofocus: false,
                  decoration: InputDecoration(
                    labelText: 'Enter Password',
                    prefixIcon: Icon(
                      Icons.lock_outline,
                      color: Colors.black,
                    ),
                    contentPadding: EdgeInsets.fromLTRB(20, 15, 20, 15),
                  ),
                ),
                TextField(
                        controller: TextEditingController(),
                        cursorColor: Color.fromRGBO(255, 215, 0, 1),
                        obscureText: true,
                        autofocus: false,
                        decoration: InputDecoration(
                          labelText: 'Re-type password',
                          prefixIcon: Icon(
                            Icons.lock_outline,
                            color: Colors.black,
                          ),
                          contentPadding: EdgeInsets.fromLTRB(20, 15, 20, 15),
                        ),
                      ),
                SizedBox(
                  height: 20,
                ),
                InkWell(
                  child: RaisedButton(
                    elevation: 10.0,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.0)),
                    textColor: Color.fromRGBO(255, 215, 0, 1),
                    color: Colors.black,
                    child: Padding(
                      padding: const EdgeInsets.only(left: 32.0, right: 32.0),
                      child: Text('Submit'),
                    ),
                    onPressed: () {},
                  ),
                ),
              ],
            ),
          ),
                  ],
        ),
      ),
    );
  }
}
