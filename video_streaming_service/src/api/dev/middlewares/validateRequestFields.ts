import { Request, Response, NextFunction } from 'express';
import isMatchingObjectType from '../helpers/isMatchingObjectType.helper';

function validateRequestFields(requiredFields: RequiredFields) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Vérification des champs du corps (body)
    if (requiredFields.body) {
      if (!isMatchingObjectType(req.body, requiredFields.body)) {
        return res.status(400).json({ error: 'Champs de corps de requête invalides.' });
      }
    }

    // Vérification des champs de la query
    if (requiredFields.query) {
      if (!isMatchingObjectType(req.query, requiredFields.query)) {
        return res.status(400).json({ error: 'Champs de query invalides.' });
      }
    }

    // Vérification des champs des paramètres
    if (requiredFields.params) {
      if (!isMatchingObjectType(req.params, requiredFields.params)) {
        return res.status(400).json({ error: 'Champs de paramètres invalides.' });
      }
    }

    // Si toutes les vérifications passent, passez à l'étape suivante du middleware
    next();
  };
}


export default validateRequestFields;