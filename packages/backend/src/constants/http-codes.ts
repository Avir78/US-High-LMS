export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const ERROR_MESSAGES = {
  // Auth
  INVALID_CREDENTIALS: "Email ou mot de passe invalide",
  UNAUTHORIZED: "Non autorisé à accéder à cette ressource",
  TOKEN_EXPIRED: "Votre token a expiré",
  TOKEN_INVALID: "Token invalide",
  USER_ALREADY_EXISTS: "Cet utilisateur existe déjà",
  USER_NOT_FOUND: "Utilisateur non trouvé",

  // Validation
  VALIDATION_ERROR: "Erreur de validation des données",
  INVALID_EMAIL: "Email invalide",
  WEAK_PASSWORD: "Le mot de passe est trop faible",
  MISSING_FIELDS: "Certains champs obligatoires sont manquants",

  // Courses
  COURSE_NOT_FOUND: "Cours non trouvé",
  ALREADY_ENROLLED: "Vous êtes déjà inscrit à ce cours",
  ENROLLMENT_NOT_FOUND: "Inscription non trouvée",

  // Simulations
  SIMULATION_NOT_FOUND: "Simulation non trouvée",
  INSUFFICIENT_CAPITAL: "Capital insuffisant pour cette opération",
  INVALID_BUSINESS_TYPE: "Type d'entreprise invalide",

  // Finance
  TRANSACTION_FAILED: "La transaction a échoué",
  LOAN_REJECTED: "Demande de prêt rejetée",
  INSUFFICIENT_FUNDS: "Fonds insuffisants",

  // Admin
  ONLY_ADMIN: "Seul l'administrateur peut accéder à cette ressource",
  ADMIN_ACTION_FORBIDDEN: "Action non autorisée pour l'administrateur",

  // Server
  INTERNAL_ERROR: "Une erreur interne s'est produite",
  SERVICE_UNAVAILABLE: "Le service n'est pas disponible actuellement",
  DATABASE_ERROR: "Erreur de base de données",
} as const;

export const SUCCESS_MESSAGES = {
  // Auth
  LOGIN_SUCCESS: "Connexion réussie",
  REGISTER_SUCCESS: "Inscription réussie",
  LOGOUT_SUCCESS: "Déconnexion réussie",
  TOKEN_REFRESHED: "Token rafraîchi avec succès",

  // Users
  PROFILE_UPDATED: "Profil mis à jour avec succès",
  PASSWORD_CHANGED: "Mot de passe changé avec succès",

  // Courses
  COURSE_CREATED: "Cours créé avec succès",
  ENROLLMENT_SUCCESSFUL: "Inscription réussie au cours",
  COURSE_COMPLETED: "Cours complété",

  // Simulations
  SIMULATION_CREATED: "Simulation créée avec succès",
  DECISION_RECORDED: "Décision enregistrée",

  // Finance
  LOAN_APPROVED: "Prêt approuvé",
  TRANSACTION_SUCCESS: "Transaction réussie",

  // Admin
  USER_ACCOUNT_RESET: "Compte utilisateur réinitialisé",
  ADMIN_ACTION_SUCCESS: "Action administrateur réussie",
} as const;
