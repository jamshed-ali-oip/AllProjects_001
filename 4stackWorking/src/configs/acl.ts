import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

// export const RoleCode: {
//   SUPER_ADMIN: 'SUPER_ADMIN',
//   COMPANY_ADMIN: 'COMPANY_ADMIN',
//   ADMIN: 'ADMIN',
//   MANAGER: 'MANAGER',
//   INSPECTOR: 'INSPECTOR'
// };
/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
  // console.log('=============defineRulesFor=========');
  // console.log("subject", subject);
  // console.log("role", role);
  // console.log('====================================');

  const { can, rules } = new AbilityBuilder(AppAbility)
  // console.log('============AbilityBuilder=========');
  // console.log("rules", rules);
  // console.log('====================================');

  if (role === 'SUPER_ADMIN') {
    can('manage', 'all')
  } else if (role === 'COMPANY_ADMIN') {
    can('itsHaveAccess', 'dashboard-page')
    can('itsHaveAccess', 'project-page')
    can('itsHaveAccess', 'employee-page')
    can('itsHaveAccess', 'client-page')
    can('itsHaveAccess', 'assignment-type-page')
    can('itsHaveAccess', 'report-label-page')

    can('allow', 'report-inspect-button')
    can('allow', 'report-manage-button')

    can('allow', 'project-add')
    can('allow', 'assignment-add')
    can('allow', 'report-add')
    can('allow', 'report-version-add')
  } else if (role === 'ADMIN') {
    can('itsHaveAccess', 'dashboard-page')
    can('itsHaveAccess', 'project-page')
    can('itsHaveAccess', 'employee-page')
    can('itsHaveAccess', 'client-page')
    can('itsHaveAccess', 'assignment-type-page')
    can('itsHaveAccess', 'report-label-page')

    can('allow', 'report-inspect-button')
    can('allow', 'report-manage-button')

    can('allow', 'project-add')
    can('allow', 'assignment-add')
    can('allow', 'report-add')
    can('allow', 'report-version-add')
  } else if (role === 'MANAGER') {
    can('itsHaveAccess', 'dashboard-page')
    can('itsHaveAccess', 'project-page')

    can('itsNotHaveAccess', 'employee-page')
    can('itsNotHaveAccess', 'client-page')
    can('itsNotHaveAccess', 'assignment-type-page')
    can('itsNotHaveAccess', 'report-label-page')

    can('deny', 'report-inspect-button')
    can('allow', 'report-manage-button')

    can('allow', 'project-add')
    can('allow', 'assignment-add')
    can('allow', 'report-add')
    can('allow', 'report-version-add')
  } else if (role === 'INSPECTOR') {
    can('itsHaveAccess', 'dashboard-page')
    can('itsHaveAccess', 'project-page')

    can('itsNotHaveAccess', 'employee-page')
    can('itsNotHaveAccess', 'client-page')
    can('itsNotHaveAccess', 'assignment-type-page')
    can('itsNotHaveAccess', 'report-label-page')

    can('allow', 'report-inspect-button')
    can('deny', 'report-manage-button')

    can('deny', 'project-add')
    can('deny', 'assignment-add')
    can('deny', 'report-add')
    can('deny', 'report-version-add')
  } else {
    can(['read', 'create', 'update', 'delete'], subject)
  }
  // else if (role === 'client') {
  //   can(['read'], 'acl-page')
  // }

  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
