import 'package:flutter/material.dart';

class WelcomeScreen extends StatefulWidget {
  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Welcome to One Africa Global'),
        centerTitle: true,
      ),
      drawer: Drawer(
        
      ),
      body: Center(
        child: Text('to be implemented'),
      ),
    );
  }
}