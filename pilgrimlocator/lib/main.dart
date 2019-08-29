import 'package:flutter/material.dart';

import 'login_screen.dart';
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {

    @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Pilgrims Locator',
      theme: ThemeData(
        primaryColor: Color.fromRGBO(255, 215, 0, 1),
        //primarySwatch: ,
      ),
      home: LoginScreen(),
    );
  }
}
