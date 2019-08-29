import 'package:flutter/material.dart';

import 'list_icons.dart';
import 'strings.dart';
import './location_screen.dart';
import './report_screen.dart';
import './send_data_screen.dart';
import './setting_screen.dart';
import './display_data_screen.dart';
import './get_data_screen.dart';
//import 'package:marquee_flutter/marquee_flutter.dart';

class HomeScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _HomeScreenState();
  }
}

class _HomeScreenState extends State<HomeScreen> {
  List<Container> _buildGridCards() {
    List<GridItem> gridItems = List<GridItem>();
    gridItems.add(GridItem(Icons.add, Strings.getData));
    gridItems.add(GridItem(Icons.add, Strings.send));
    gridItems.add(GridItem(Icons.add, Strings.display));
    gridItems.add(GridItem(Icons.add, Strings.location));
    gridItems.add(GridItem(Icons.add, Strings.report));
    gridItems.add(GridItem(Icons.add, Strings.setting));

    if (gridItems == null || gridItems.isEmpty) {
      return const <Container>[];
    }

    return gridItems.map((gridItems) {
      return Container(
        decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(15.0),
            boxShadow: [
              BoxShadow(
                  color: Color.fromRGBO(255, 215, 0, 1),
                  offset: Offset(0.0, 10.0),
                  blurRadius: 10.0,
                  spreadRadius: 1.0)
            ]),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            //      FlutterLogo(size: 40.0,),
            AspectRatio(
              aspectRatio: 1.8,
              child: FlutterLogo(
                size: 2.0,
              ),
            ),
            Expanded(
              child: Padding(
                padding: EdgeInsets.all(15.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[Text(gridItems.title)],
                ),
              ),
            )
          ],
        ),
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 15.0,
        leading: Icon(
          Icons.home,
          color: Color.fromRGBO(255, 215, 0, 1),
        ),
        actions: <Widget>[
          InkWell(
            child: IconButton(
              onPressed: () {},
              icon: Icon(
                Icons.exit_to_app,
                color: Color.fromRGBO(255, 215, 0, 1),
              ),
            ),
          ),
        ],
        backgroundColor: Colors.black,
        titleSpacing: 5.0,
        centerTitle: true,
        title: Text(
          'Home',
          style: TextStyle(
            color: Color.fromRGBO(255, 215, 0, 1),
          ),
        ),
      ),
      body: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Expanded(
                child: GridView.builder(
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        mainAxisSpacing: 35.0,
                        crossAxisSpacing: 20.0),
                    padding: EdgeInsets.fromLTRB(15.0, 32.0, 15.0, 32.0),
                    itemCount: ListIcon().list.length,
                    itemBuilder: (BuildContext context, int index) {
                      return InkWell(
                        //  splashColor: FlutterColor("#071B42"),
                        onTap: () {
                          switch (index) {
                            case 0:
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => GetDataScreen()));
                              break;
                            case 1:
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => SendDataScreen()));
                              break;
                            case 2:
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          DisplayDatacreen()));
                              break;
                            case 3:
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => LocationScreen()));
                              break;
                            case 4:
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => ReportScreen()));
                              break;
                            case 5:
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => SettingsScreen()));
                              break;
                          }
                        },
                        child: Material(
                            child: Container(
                              width: MediaQuery.of(context).size.width / 2,
                              height: 50,
                              decoration: BoxDecoration(
                                  //color: Colors.white,
                                  //      border: Border.all(color: Colors.blue),
                                  borderRadius: BorderRadius.circular(15.0),
                                  boxShadow: []),
                              child: Center(
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: <Widget>[
                                    Icon(
                                      ListIcon().list[index]["icon"],
                                      size: 50,
                                      color: Color.fromRGBO(255, 215, 0, 1),
                                    ),
                                    Padding(
                                      padding: EdgeInsets.fromLTRB(
                                          8.0, 8.0, 8.0, 0.0),
                                      child:
                                          Text(ListIcon().list[index]["name"]),
                                    )
                                  ],
                                ),
                              ),
                            ),
                            shape: new RoundedRectangleBorder(
                                borderRadius: new BorderRadius.circular(15.0)),
                            elevation: 5.0,
                            shadowColor: Colors.black),
                      );
                    })),
          ]),
    );
  }
}

class GridItem {
  IconData icon;
  String title;

  GridItem(this.icon, this.title);
}
