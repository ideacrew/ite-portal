cd dist/apps/provider-gateway
aws s3 sync --acl public-read . s3://provider-gateway-dev-dbh-ite-com/ --delete
invalidationId=`AWS_MAX_ATTEMPTS=999 aws cloudfront create-invalidation --distribution-id E37CU4MXO6RHYU --output text --query 'Invalidation.Id' --paths '/*'`
aws cloudfront wait invalidation-completed --distribution-id E37CU4MXO6RHYU --id ${invalidationId}
