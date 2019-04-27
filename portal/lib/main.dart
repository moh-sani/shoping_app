import 'package:flutter/material.dart';
import 'package:portal/loginScreen.dart';

void main() => runApp(Portal());

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
