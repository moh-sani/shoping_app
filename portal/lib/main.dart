import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:portal/loginScreen.dart';

void main() => runApp(Portal());

final String server = 
defaultTargetPlatform == TargetPlatform.android ? "10.0.2.2" : "localhost";

class Portal extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "A.B.U Portal",
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: LoginScreen(),
    );
  }
}
