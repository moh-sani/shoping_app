import 'package:flutter/material.dart';

class ForgotPassword extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _ForgotScreenState();
  }
}

class _ForgotScreenState extends State<ForgotPassword> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 15.0,
        backgroundColor: Colors.black,
        titleSpacing: 5.0,
        centerTitle: true,
        title: Text(
          'Forgot Password',
          style: TextStyle(
            color: Color.fromRGBO(255, 215, 0, 1),
          ),
        ),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(32.0),
          child: Column(
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
                        child: Text('Reset'),
                      ),
                      onPressed: () {},
                    ),
                  ),
            ],
          ),
        ),
      ),
    );
  }
}
