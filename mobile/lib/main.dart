import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:conce_app/pages/account_page.dart';
import 'package:conce_app/pages/wallet_page.dart';
import 'package:conce_app/pages/login_page.dart';
import 'package:conce_app/pages/splash_page.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // TODO: read from .env file
  await Supabase.initialize(
    url: 'https://gjxvzzhqvecxdtfqvdah.supabase.co',
    anonKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzI1MTU3NSwiZXhwIjoxOTQ4ODI3NTc1fQ.l1LfM1UfLaoHUXPvsEPh1jpV-yteP-1KGALbxtnQ_l4',
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Conce App',
      theme: ThemeData.dark().copyWith(
        primaryColor: Colors.green,
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            onPrimary: Colors.white,
            primary: Colors.green,
          ),
        ),
      ),
      initialRoute: '/',
      routes: <String, WidgetBuilder>{
        '/': (_) => const SplashPage(),
        '/login': (_) => const LoginPage(),
        '/account': (_) => const AccountPage(),
        '/wallet': (_) => const WalletPage(),
      },
    );
  }
}
