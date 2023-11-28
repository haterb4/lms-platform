import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Fonction middleware pour valider le token et les autorisations d'accès
export const validateResourceAccess = (requiredScopes: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token d\'accès manquant' });
    }

    jwt.verify(token, 'votre_clé_secrète', (err, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Token d\'accès invalide' });
      }

      // Vérifiez les autorisations nécessaires
      const userScopes: string[] = decoded.scopes;
      const hasRequiredScopes = requiredScopes.every(scope => userScopes.includes(scope));

      if (!hasRequiredScopes) {
        return res.status(403).json({ message: 'Accès refusé. Autorisations insuffisantes.' });
      }

      // Si le token est valide et les autorisations sont correctes, passez à la route suivante
      next();
    });
  };
};
