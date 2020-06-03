# ************************
#  Android
# ************************
  
private_lane :build_android do |options|
    build_type  = options[:build_type]
    flavor = options[:flavor]
    application_id = options[:application_id]
  
    version_code = get_timestamp_build_number
    version_name = get_version_from_package
  
    gradle(
      project_dir: './android',
      # task: 'bundle', TODO: we should use `bundle` for production
      task: 'assemble',
      flavor: flavor,
      build_type: build_type,
      properties: {
        "versionCode" => version_code,
        "versionName" => version_name,
        "applicationId" => application_id
      }      
    )
  end
    
  # ************************
  #  iOS
  # ************************
  
  
  private_lane :build_ios do |options|
    # In order to use this deploy method you need to have imported the certificate 
    # and provisioning profile in the local keystore
    ios_scheme  = options[:ios_scheme]
    ios_workspace = options[:ios_workspace]
    ios_xcconfig = options[:ios_xcconfig]
    ios_bundle_id = options[:ios_bundle_id]
    provisioning_profile_specifier = options[:provisioning_profile_specifier]
    export_method = options[:export_method]
    
    set_ios_version_number_from_package_json(options)
    set_ios_build_number_from_timestamp(options)
  
    # Gym takes the following variables from the env's xcconfig: 
    #   - CODE_SIGN_STYLE
    #   - CODE_SIGN_IDENTITY
    #   - DEVELOPMENT_TEAM
    #   - PROVISIONING_PROFILE_SPECIFIER
    gym(
      export_method: export_method,
      export_options: {
        method: export_method,
        provisioningProfiles: {
            ios_bundle_id => provisioning_profile_specifier,
        }
      },
      workspace: ios_workspace,
      scheme: ios_scheme,
      xcconfig: ios_xcconfig,
      include_bitcode: false,
      output_directory: 'ios-build',
      output_name: 'DtvSelfCare.ipa',
    )
  end
  
  private_lane :set_ios_version_number_from_package_json do |options|
    ios_xcodeproj = options[:ios_xcodeproj]
    version_number = get_version_from_package
  
    increment_version_number(
      version_number: version_number,
      xcodeproj: ios_xcodeproj 
    )
  end
  
  private_lane :set_ios_build_number_from_timestamp do |options|
    ios_xcodeproj = options[:ios_xcodeproj]
    build_number = get_timestamp_build_number
  
    increment_build_number(
      build_number: build_number,
      xcodeproj: ios_xcodeproj
    )
  end
  
  private_lane :set_ios_build_number_from_testflight do |options|
    ios_bundle_id = options[:ios_bundle_id]
    ios_xcodeproj = options[:ios_xcodeproj]
    itunes_connect_team_id = options[:itunes_connect_team_id]
    itunes_connect_team_name = options[:itunes_connect_team_name]
  
    build_number = latest_testflight_build_number(
      app_identifier: ios_bundle_id,
      team_id: itunes_connect_team_id,
      team_name: itunes_connect_team_name
    ) + 1
  
    increment_build_number(
      build_number: build_number,
      xcodeproj: ios_xcodeproj
    )
  end
  
  # ************************
  #  Common
  # ************************
  
  private_lane :get_version_from_package do
    file = File.read('../package.json')
    data = JSON.parse(file)
  
    data['version']
  end
  
  private_lane :get_timestamp_build_number do
    # Epoch time won't work after "Jul 18 2036" due of versionCode Android's limit (2100000000)
    # To workaround that, we substract project start date in epoch format (2020/03/01)
    prject_start_date = 1583020800
    Time.now.utc.to_i - prject_start_date
  end