require 'test_helper'

class SiteControllerTest < ActionController::TestCase
  test "should get root" do
    get :root
    assert_response :success
  end

end
