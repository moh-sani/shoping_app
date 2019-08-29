import 'package:flutter/material.dart';

class ProductCreatePage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _ProductCreatePageState();
  }
}

class _ProductCreatePageState extends State<ProductCreatePage> {
  String textValue;
  String descriptionValue;
  double priceValue;
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(10.0),
      child: ListView(
        children: <Widget>[
          TextField(
            decoration: InputDecoration(hintText: 'Product title'),
            onChanged: (String value) {
              setState(() {
                textValue = value;
              });
            },
          ),
          TextField(
            decoration: InputDecoration(hintText: 'Product Description'),
            onChanged: (String value) {
              setState(() {
                descriptionValue = value;
              });
            },
            maxLines: 3,
            keyboardType: TextInputType.text,
          ),
          TextField(
            decoration: InputDecoration(hintText: 'Price'),
            onChanged: (String value) {
              setState(() {
                priceValue = double.parse(value);
              });
            },
            keyboardType: TextInputType.number,
          ),
          RaisedButton(
            child: Text('SAVE'),
            onPressed: (){},
          )
        ],
      ),
    );
  }
}
