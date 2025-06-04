// Importe la fonction checkBody 
import { checkBody } from "../modules/checkBody";

// Test 1 
it('devrait retourner true si tous les champs sont présents et non vides', () => 
{
    //tout les champs sont bons
    const body = { email: 'test@mail.com', password: '1234' };
    
    // Liste des champs requis à vérifier
    const keys = ['email', 'password'];

    //resultat attendu (true)
    expect(checkBody(body, keys)).toBe(true);
});

// Test 2
it('retourne false si un champ est manquant', () => 
{
  //  le champ 'password' est manquant  
  const body = { email: 'test@mail.com' };

   // Liste des champs requis à vérifier
  const keys = ['email', 'password'];

  //resultat attendu (false)
  expect(checkBody(body, keys)).toBe(false);
});

// Test 3
it('retourne false si un champ est vide', () => 
{

  // Le champ 'email' est vide  
  const body = { email: '', password: '1234' };

   // Liste des champs requis à vérifier
  const keys = ['email', 'password'];

  //resultat attendu (false)
  expect(checkBody(body, keys)).toBe(false);
});

